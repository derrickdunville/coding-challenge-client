import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "assets/img/ambassador.png";
import { Helmet } from 'react-helmet'

// static router renames the context to staticContext
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true

  return (
    <div style={{width: "100%", justifyContent: "center", textAlign: "center"}}>
      <Helmet title={"404 Not Found"} meta={[
          {name: "description", content: "This website was made by Derrick Dunville to solve an inteview coding challange for Ambassador."}
        ]}/>
      <h1>Ooops, 404!</h1>
      <NavLink to="/"><img src={logo}/></NavLink>
      <h2>Head back to the embassy</h2>
    </div>
  )
}

export default {
  component: NotFoundPage
}
