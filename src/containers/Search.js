import React, { Component } from 'react';
import config from '../config/config';
import axios from 'axios';
import Searchbar from '../components/Layout/Searchbar'
import Table from '../components/Layout/Table';
import Spinner from '../components/Layout/Spinner'
import Chart from '../components/Analytics/Chart';
import Sidenav from '../components/Layout/Sidenav';
import moment from 'moment';//This is for formatting the dates
import Pagination from '../components/Layout/Pagination';
class Search extends Component {
  state = {
    newsRetrieved: [],
    loading: false,
    tableHeader: [],
    query: '',
    message: '',
    cancel: '',
    totalResults: 0,
    totalPages: 0,
    currentPageNo: 0
  }
  //componentDidMount = () => {
  // this.setState({
  //   loading: true
  // })
  //Make the api call
  // axios.get(`${config.baseUrl}?q=rainbow&page=2&api-key=${config.app_key}`).then(response => {
  //   this.setState({
  //     loading: false
  //   })
  //   console.log(response);
  //   console.log(response.data.response.docs);
  //   const newsArray = response.data.response.docs;
  //   let headerArray = Object.keys(response.data.response.docs[0]);//This will return an array of all keys
  //   this.setState({
  //     newsRetrieved: newsArray,
  //     tableHeader: headerArray
  //   });

  //   console.log(headerArray);


  // }).catch(err => {
  //   alert(err);
  // })

  //}
  //Handle Input change
  handleOnInputChange = (e) => {
    const query = e.target.value;
    console.log(query);
    this.setState({
      query,
      loading: true,
      message: ''
    }, () => {
      this.fetchedSearchResults(1, this.state.query);
    });

  }
  fetchedSearchResults = (updatePageNo = '', query) => {
    console.log(query);
    const pageNumber = updatePageNo ? `&page=${updatePageNo}` : '';

    //cancel the previous requests
    if (this.state.cancel) {
      this.state.cancel.cancel();
    }
    //otherwise create a new token and store it
    this.setState({
      cancel: axios.CancelToken.source()
    })
    this.setState({
      loading: true
    })
    console.log(query);
    axios.get(`${config.baseUrl}?q=${query}${pageNumber}&api-key=${config.app_key}`, {
      cancelToken: this.state.cancel.token
    }).then(response => {

      console.log(response);
      console.log(response.data.response.docs);
      const total = response.data.response.meta.hits / 1000;
      const totalPageCount = this.getPageCount(total, 10);
      const newsArray = response.data.response.docs;
      let headerArray = Object.keys(response.data.response.docs[0]);//This will return an array of all keys
      this.setState({
        loading: false,
        newsRetrieved: newsArray,
        tableHeader: headerArray,
        totalResults: total,
        totalPages: totalPageCount,
        currentPageNo: updatePageNo
      });

      console.log(headerArray);


    }).catch(err => {
      // alert(err);

      if (axios.isCancel(err) || err) {
        this.setState({
          loading: false,
          message: 'Failed to fetch'
        })
      }

    })

  }

  //count pages
  getPageCount = (total, denominator) => {
    const divisible = 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  }

  //handle Pagination
  handlePageClick = (event, type) => {
    event.preventDefault();
    const updatePageNo = 'prev' === type ? this.state.currentPageNo - 1 : this.state.currentPageNo + 1
    if (!this.state.loading) {
      this.setState({ loading: false }, () => {
        this.fetchedSearchResults(updatePageNo, this.state.query);
      })
    }
  }


  renderTableHeader() {
    // return this.state.tableHeader.map((key, index) => {
    //   return <th key={index}>{key.toUpperCase()}</th>
    // })
    return (<>
      <th>Publishing date</th>
      <th>Headline</th>
      <th>Summary</th>
      <th>URL</th>
      <th>Source</th>
    </>)
  }
  //Truncate the string
  truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...'
  }
  renderTableData() {
    return this.state.newsRetrieved.map((news, index) => {
      return (
        <tr key={news._id}>
          <td>{this.truncateString(moment(news.pub_date).calendar(), 25)}</td>
          <td title={news.abstract}>{this.truncateString(news.abstract, 20)}</td>
          <td title={news.headline.main}>{this.truncateString(news.headline.main, 20)}</td>
          <td title={news.web_url}><a href={news.web_url} target="_blank">{this.truncateString(news.web_url, 20)}</a></td>
          <td title={news.source}>{this.truncateString(news.source, 20)}</td>
        </tr>
      )
    })
  }
  render() {

    // let RetrievedData = this.state.newsRetrieved.map(news => {
    //   return <Table key={news._id} summary={news.abstract} />

    // })
    let RetrievedData = (<table className="responsive-table striped">
      <tbody>
        <tr>{this.renderTableHeader()}</tr>
        {this.renderTableData()}
      </tbody>
    </table>);
    if (this.state.loading) {
      RetrievedData = <Spinner />;
    }
    const { query, loading, message, currentPageNo, totalPages } = this.state;//destructuring
    const showPrevLink = 1 < currentPageNo;
    const showNextLink = totalPages > currentPageNo;

    return (<>
      <Searchbar change={this.handleOnInputChange} value={query} name="query" />
      <div className="row">
        <div className="col s3"><Sidenav /></div>
        <div className="col s9">
          <div className="card">
            <div className="card-content">
              <div className="card-title">
                <span>ARTICLES</span>
              </div>
              {RetrievedData}
            </div>
            <div className="card-action">Pagination
            <Pagination
                loading={loading}
                showPrevLink={showPrevLink}
                showNextLink={showNextLink}
                handlePrevClick={(event) => this.handlePageClick(event, 'prev')}
                handleNextClick={(event) => this.handlePageClick(event, 'next')} />
            </div>
          </div>
        </div>


      </div>
      <div className="row">
        <div className="col s9 offset-s3">
          <Chart />
        </div>
      </div>
    </>)
  }
}



export default Search;