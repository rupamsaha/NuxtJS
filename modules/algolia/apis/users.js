import { getHeaders } from "../helpers";
import fetch from "node-fetch";
import { unwrap, getErrorResponse } from "../../../utils/fetchUtils";

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig);
  return {
    removeHome: async function(identity, homeId){
        const payload = (await this.getById(identity)).json
        const homes = payload.homeId.filter(id => id != homeId)
        payload.homeId = homes
        this.create(identity, payload)
    },
    assignHome: async (identity, homeId) => {
        const payload = (await this.getById(identity)).JSON
        payload.homeId.push(homeId)
        this.create(identity, payload)
    },
    create: async (identity, payload) => {
      try {
        return unwrap(
          await fetch(
            `https://${algoliaConfig.appID}-dsn.algolia.net/1/indexes/users/${identity.id}`,
            {
              headers,
              method: "PUT",
              body: JSON.stringify(payload),
            }
          )
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },
    getById: async (identity) => {
      try {
        return unwrap(
          await fetch(
            `https://${algoliaConfig.appID}-dsn.algolia.net/1/indexes/users/${identity.id}`,
            {
              headers,
            }
          )
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },
  };
};
