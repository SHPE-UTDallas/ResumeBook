import Head from 'next/head'
import FilterPane from '../components/FilterPane';
import fetch from 'node-fetch';
import { connect } from 'react-redux'
import withReduxStore from '../lib/redux'
import {storeDataFromAPI} from '../redux/actions'
const IndexPage = () => {
  return (
    <>
      <FilterPane />
    </>
  );
}


IndexPage.getInitialProps = async ({ reduxStore}) => {
  const data = await fetch("https://demo8344494.mockable.io/new").then(function(response) {
    return response.json();
  }).then(items => reduxStore.dispatch(storeDataFromAPI(items)));
  return {}
}


export default IndexPage;
