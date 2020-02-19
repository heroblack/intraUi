import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import './BadgeAll.css';
import BadgesList from '../../BadgeList'
import Hero from '../../../Hero'
import api from "../../../../../log";
import PageError from "../../../Errors/PageError";
import Loader from "../../../Loaders/Loader"
import MiniLoader from '../../../Loaders/MiniLoader'
class BadgeAll extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            error:null,
            data: {
                results: []
              }
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        this.setState({loading:true, error:null})
        try {
            const data = await api.badges.list();
         
            this.setState({loading:false, data:{result:data}})
            console.log('LA DATA IS:::', this.state)
        }
        catch(error) {
            this.setState({loading:false, error:error})
        }
    }
   render() { 
 
     console.log('OK KIS',this.state.data)

     if(this.state.error) {
         return <PageError error={this.state.error}/>
     }

     if (this.state.loading === true && !this.state.data.results) {
        return (
          <div className="loader">
            <MiniLoader />
          </div>
        );
      }

   return(
   <Fragment>
       <Hero />
       <div className="Badges">
           <div className="Badges__buttons">
               <Link to="/badges/new" className="btn btn-primary">
                 New Badge
               </Link>
            </div>
        <div className="Badges">
        <BadgesList badges={this.state.data.results} />
        {this.state.loading && <MiniLoader />}
      </div>
    </div>
  </Fragment>
   )
}
}

export default BadgeAll


