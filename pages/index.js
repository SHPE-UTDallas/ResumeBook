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
  }).then(items => { console.log(reduxStore); reduxStore.dispatch(storeDataFromAPI(items)) });
  console.log(data);
  return {}
}
// export async function getStaticProps() {
//   // Get external data from the file system, API, DB, etc.
//   console.log("TEST!!!");
//   // const data = await fetch("https://demo8344494.mockable.io/new").then(function(response) {
//   //   return response.json();
//   // }).then(items => storeDataFromAPI(items));
// }


export default IndexPage;
