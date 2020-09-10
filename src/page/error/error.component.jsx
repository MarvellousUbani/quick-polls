import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => (
  <div>
    <h1 className="error-404">404 Page</h1>
    <p className="text-center">
      <Link className="button__red" to="/">
        Go back to Home
      </Link>
    </p>
  </div>
);

export default ErrorPage;
