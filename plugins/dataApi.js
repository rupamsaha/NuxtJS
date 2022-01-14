import { unwrap, getErrorResponse } from '~/utils/fetchUtils'

export default function ({ $config }, inject) {
  const headers = {
    "X-Algolia-API-Key": $config.algolia.key,
    "X-Algolia-Application-Id": $config.algolia.appID,
  };

  inject("dataApi", {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomesByLocation,
  });

  async function getHome(homeId) {
    try {
      return unwrap(
        await fetch(
          `https://${$config.algolia.appID}-dsn.algolia.net/1/indexes/homes/${homeId}`,
          {
            headers,
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return unwrap(
        await fetch(
          `https://${$config.algolia.appID}-dsn.algolia.net/1/indexes/reviews/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
              hitsPerPage: 6,
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUserByHomeId(homeId) {
    try {
      return unwrap(
        await fetch(
          `https://${$config.algolia.appID}-dsn.algolia.net/1/indexes/users/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomesByLocation(lat, lng, radiusInMeters = 1500 * 15) {
    try {
      return unwrap(
        await fetch(
          `https://${$config.algolia.appID}-dsn.algolia.net/1/indexes/homes/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              aroundLatLng: `${lat},${lng}`,
              aroundRadius: radiusInMeters,
              hitsPerPage: 10,
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
