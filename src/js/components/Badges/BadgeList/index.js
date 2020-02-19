import React, { Fragment, Component } from 'react'

class BadgeList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('MIS PROPS SON :', this.props)
        return (<h1>Test</h1>)
        /*
        if(this.props.badges.length === 0) {
            return (
            <div>
               <h3>No were found any Badges</h3>
               <Link className="btn btn-primary" to="/badges/new">  
                Create New Badge
               </Link>
           </div>
       )
     } 
  
    return(<Fragment>
             <ul className="list-unstyled">
                {this.props.badges.map(badge => {
                    return (
                          <li key={badge.id} className="badgesListItems mb-2">
                             <Link  className="text-reset text-decoration-none" to={`/badges/${badge.id}`}>
                              LINK
                             </Link>

                          </li>
                    );
                })} 

             </ul>
          </Fragment>)*/
    }
}
export default BadgeList