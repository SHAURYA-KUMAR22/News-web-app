import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
      let {title,description,imageUrl,newsUrl,author,date,source}=this.props; //making props 
    return (
      <div className="my-3">
          <div className="card" /*style={{width: "18rem"}}*/>
            <div style={{
              display:'flex',
              justifyContent: 'flex-end',
              position:'absolute',
              right:'0',
            }}>
            <span className="badge rounded-pill bg-primary" /*style={{left:"90%",zIndex:"1"}}*/  > {source}</span>

            </div>
          
            <img src={imageUrl?imageUrl:"https://images.cnbctv18.com/wp-content/uploads/2021/02/BSE.jpg"}
             className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">ream more</a>
            </div>
          </div>
      </div>
    )   
  }
}

export default NewsItem  