import axios from "axios";

export default class Api {
  getDataL = () => {
    const listData = [];
    for (let i = 0; i < 5; i++) {
      listData.push({
        address:
          "3rd Floor (Above Baskin Robbins), #1664, 27th Main Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102",
        type: "Car",
        costPerDay: 100,
        contactNumber: "23617823681",
        vehicleAvailability: "Available",
        id: "ei2837913012hdj",
        lattitude: 172.32131,
        longitude: 174.2313,
        email: "tp@gmail.com",
        content: "lorem ipsum dolor si amet"
      });
    }
    return listData;
  };

  getPostsAround = (lat, lng, dist, cb) => {
    console.log(lat, lng, dist);
    axios.post('http://localhost:8080/rsl/borrow/retrieve', {
      lattitude: lat,
	    longitude : lng,
	    distance : dist
    }).then((res) => {cb(this.parseOwnerData(res))});
  };

  getOwnerDataM = email => {
    const listData = [];
    for (let i = 0; i < 5; i++) {
      listData.push({
        address:
          "3rd Floor (Above Baskin Robbins), #1664, 27th Main Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102",
        type: "Car",
        costPerDay: 100,
        contactNumber: "23617823681",
        vehicleAvailability: "UnAvailable",
        id: "ei2837913012hdj",
        lattitude: 172.32131,
        longitude: 174.2313,
        email: "tp@gmail.com",
        content: "lorem ipsum dolor si amet"
      });
    }
    return listData;
  };

  parseOwnerData = data => {
    // debugger;
    data = data.data.hits.hits;
    let res = [];
    for (var i = 0; i < data.length; ++i) {
      let curdata = data[i]._source;
      curdata.id = data[i]._id;
      res.push(curdata);
    }

    return res;
  };

  getOwnerData = (email, setdata) => {
    axios.post("http://localhost:8080/rsl/lend/retrieve", { email }).then(res => {
      setdata(this.parseOwnerData(res));
    });
  };

  setAvailability = (postId, avl) => {

    console.log("Post call for setting Availability to :" + avl + " for post=" + postId);
    axios.post("http://localhost:8080/rsl/lend/toggle", {postId, status:avl});
  };

  addVehicle = req => {

    console.log("Send Post request with req=" + JSON.stringify(req));
    axios.post("http://localhost:8080/rsl/lend/create", req);
  };

  sendEmail = (fromId, toId, postId, cb) => {
    //send api call
    console.log("Send Post request with from=" + fromId + " to=" + toId + " postId=" + postId);
    axios.post('http://localhost:8080/rsl/borrow/interested', {lendersEmail: toId, borrowersEmail: fromId, postId}).then(() => {cb()});
  };
}
