import App, { Container } from 'next/app'
import React from 'react'
import Head from 'next/head'

import NProgress from 'nprogress'
import Router from 'next/router'

import { Header } from '<components>'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title>Giornie</title>
        </Head>

        <Header {...pageProps} />

        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp
