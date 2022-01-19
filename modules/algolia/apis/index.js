import userApi from "./users";
import homesApi from "./homes";

export default (algoliaConfig) => ({
  user: userApi(algoliaConfig),
  homes: homesApi(algoliaConfig),
});
