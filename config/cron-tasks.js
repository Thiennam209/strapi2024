const axios = require("axios");

module.exports = {
  postCountEmail: {
    task: async ({ strapi }) => {
      const entry = await strapi.entityService.update("api::test.test", 1, {
        data: {
          Testing: "xxx",
        },
      });

      console.log("Hello: ", entry);
      const URL = "https://sketchfab.com/oauth2/token/";

      axios
        .post(URL, null, {
          params: {
            grant_type: "password",
            client_id: "Ql4tfguhnQ6o4H13WwYFchz9PsORzNdnbBiQ0iVj",
            client_secret:
              "DA52MfBbwyBLIbDnnIf7exPwrre7GLxRrRyY4qqqP1MYGngXSzYPfI9aO6eb0AoTiiNWLX0vFIHVN4XbQGIbWsBGzhOH3ujbm35pHU7QDu3PCcp3UA8bdIS6qSFU6AXk",
            username: "nganha2169@gmail.com",
            password: "Sketchfab123@",
          },
        })
        .then((response) => {
          axios
            .get("https://api.sketchfab.com/v3/models/047bb0dd5e224cf69130e2a0669a2fb8/download", {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.warn(err));

      console.log("Hello2: ");
    },
    options: {
      // Every minute
      rule: "*/1 * * * *",
    },
  },
};
