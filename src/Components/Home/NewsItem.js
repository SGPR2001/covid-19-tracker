import React from "react";
import {Card} from "reactstrap"

function NewsItem(props) {
 
    return (
      <div style={{ width: "400px" ,marginTop:"10px"}}>
        <Card>
          <strong>{props.articles.title} </strong>

          <a className="text-center" href={props.articles.webUrl}>
            Read more
          </a>
        </Card>
      </div>
    );
  
}

export default NewsItem;
