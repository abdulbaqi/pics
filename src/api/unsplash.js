import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      "Client-ID cfadcc63674541ef1c2229f851cabf95b1b5102f693983f1ea5b467bc7791670"
  }
});
