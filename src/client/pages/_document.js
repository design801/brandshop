import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import JssProvider from 'react-jss/lib/JssProvider'
import flush from 'styled-jsx/server'
import getPageContext from '@lib/getPageContext'

class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content={'user-scalable=0, initial-scale=1, minimum-scale=1, height=device-height, width=device-width'}/>
          {/* <meta name="viewport" content={'user-scalable=no, width=640, height=1160'}/> */}
          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />

          <link rel="icon" href="/static/favicon.ico" type="image/png" sizes="16x16"/>
          <link href="https://fonts.googleapis.com/css?family=Orbitron:400,700|PT+Sans:700" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Nanum Gothic:400" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Baloo Bhai:400,700" rel="stylesheet"/>

          <script src="/static/js/svgxuse.js" defer></script>
          <script src="/static/js/detect_browser.js" defer></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}


MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context of the page to collected side effects.
  const pageContext = getPageContext();
  const page = ctx.renderPage(Component => props => (
    <JssProvider
      registry={ pageContext.sheetsRegistry }
      generateClassName={ pageContext.generateClassName }
    >
      <Component pageContext={ pageContext } { ...props } />
    </JssProvider>
  ));

  return {
    ...page,
    pageContext,
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
        />
        { flush() || null }
      </React.Fragment>
    ),
  };
};

export default MyDocument;
