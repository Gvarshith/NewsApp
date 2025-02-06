import React  from "react";

const NewsItem = (props) =>{
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !props.imgUrl
                ? "https://ichef.bbci.co.uk/news/1024/branded_news/a944/live/f33437b0-9ad2-11ef-860d-e138112a1565.jpg"
                : props.imgUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body" >
            <h5 className="card-title">
              {props.title}
              <span class="position-absolute top-0  translate-middle badge bg-danger rounded-pill " style={{left :' 90% ', zIndex : '1'}}>
                {props.source}
                <span class="visually-hidden">unread messages</span>
              </span>
            </h5>
            <p className="card-text">{props.description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!props.author ? "unknown" : props.author} on{" "}
                {new Date(props.date).toGMTString()}
              </small>
            </p>
            <a href={props.newsUrl} target="blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
