exports.handler = function (event, context, callback) {
  let body;

  const secretContent = `
  <h3>Welcome to the Secret Area</h3>
  <p>Here we can tell you that the sky is <strong>blue</strong> and 2+2=<strong>4</strong></p>
  `;

  if (event.body) {
    body = JSON.parse(event.body);
  } else {
    body = {};
  }

  if (body.password == "javascript") {
    callback(null, {
      statusCode: 200,
      body: secretContent,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } else {
    callback(null, {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};
