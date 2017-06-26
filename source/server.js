import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'
import { Provider } from 'react-redux'
//components
import store from './store'
import Pages from './pages/containers/Page.jsx'
import Layout from './pages/components/Layout.jsx'


function requestHandler(request, response) {
  const context = createServerRenderContext()
  let html = renderToString(
    <Provider store={store}>
      <ServerRouter location={request.url} context={context}>
        <Pages />
      </ServerRouter>
    </Provider>
  )

  const result = context.getResult();

  response.setHeader('Content-Type', 'text/html');

  if (result.redirect) {
    response.writeHead(301, {
      Location: result.redirect.pathname,
    });
  }

  if (result.missed) {
    response.writeHead(404);

    html = renderToString(
      <Provider store={store}>
        <ServerRouter location={request.url} context={context}>
          <Pages />
        </ServerRouter>
      </Provider>
    );
  }

  response.write(
    renderToStaticMarkup(<Layout title="proyecto papu" content={html} />)
  );
  response.end();
}

const server = http.createServer(requestHandler);


server.listen(3000);
