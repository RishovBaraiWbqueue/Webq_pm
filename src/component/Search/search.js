import React, { Component } from 'react'

export default class Search extends Component {
  render() {
    return (
      <div>
        <div className="row">
            <div className="col-sm-6">
                <p>{this.state.name}</p>
            </div>
            <div className="col-sm-6">
                <div className="serch-bx">
                    <div className="serch-br">
                        <input type="search" name="search"  className="form-control" placeholder="Search" />
                        <button type="button" className="btn btn-serch"><i className="fa fa-search" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
