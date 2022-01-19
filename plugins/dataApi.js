import { unwrap, getErrorResponse } from "~/utils/fetchUtils";

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
    getHomes,
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

  // eslint-disable-next-line max-params
  async function getHomesByLocation(
    lat,
    lng,
    start,
    end,
    radiusInMeters = 1500 * 15
  ) {
    try {
      const days = [];
      for (let day = start; day <= end; day += 86400) {
        days.push(`availability:${day}`);
      }
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
              filters: days.join(" AND "),
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomes() {
    try {
      return unwrap(
        await fetch(
          `https://${$config.algolia.appID}-dsn.algolia.net/1/indexes/homes/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              hitsPerPage: 3,
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
