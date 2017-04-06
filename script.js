// First thing's first, you'll need to create an app in the Yelp API. To do this, got to: 
// https://www.yelp.com/developers/v3/manage_app

// Once you've created your app, you will be given an app ID and an app secret. Make sure 
// to keep these, as you'll need them for your initial ajax call.


// Declare a variable to keep the current Yelp API token in.
var accessToken;

// Make our initial post request to Yelp to receive our session token.
// This token will be used throughout our app to make various calls to the API.
// We must make this call in the JavaScript, as the token will be different for each session
// of the app you open. Therefor, it must be called here, at the start of the JavaScript.

// We are making a POST request here. A POST request is similar to a GET request, only the server
// (in this case, the Yelp API) is expecting to get information that it needs to keep. So instead
// of passing information in a query URL, we'll be giving the ajax request a data object, containing
// all of the information that the Yelp API needs to generate our token. This includes our app ID and 
// secret, as well as the grant type, which for now will always be "client_credentials"
$.ajax({
  url: "https://api.yelp.com/oauth2/token",
  method: "POST",
  data: {
    client_id: "",
    client_secret: "",
    grant_type: "client_credentials"
  }
}).done(function (response) {
  // set the global "accessToken" variable to the token that the ajax call returns
  accessToken = response.data.access_token;
});

// Now that we have our access token, we can make a request to the Yelp API for the data we want
// For this example, we'll search for delis in a particular area.
// For this example, I'll keep the variable declarations clustered with their use cases, but keep in
// mind that you should be declaring all variables at the top of their respective scopes, wherever 
// possible.
var searchTerm = "deli";
var latitude = "37.786882";
var longitude = "-122.399972";
$.ajax({
  url: "https://api.yelp.com/v3/businesses/search?term=" + searchTerm + "&latitude=" + latitude + 
    "&longitude=" + longitude,
  method: "GET"
}).done(function (response) {
  console.log(response.data);
});

// The one problem that you may run into when working with this API, is that this API does not 
// allow null host CORS requests. So you will not be able to make requests without making 
// them from a server. This means that you will need to either push your repo up to a GitHub Pages
// and test there, or use the wonderful Postman tool (https://www.getpostman.com/) to test your 
// endpoints. You'll still need to make the initial post request when using postman.