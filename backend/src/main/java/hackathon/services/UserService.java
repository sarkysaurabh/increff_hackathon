package hackathon.services;

import hackathon.model.LendRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchAutoConfiguration;
import org.springframework.boot.autoconfigure.elasticsearch.rest.RestClientAutoConfiguration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;

@Service

@EnableAutoConfiguration(exclude={ElasticsearchAutoConfiguration.class, RestClientAutoConfiguration.class})
public class UserService {

    Util util;
    TransportClient client;
    @Autowired
    private JavaMailSender sender;

    @Autowired
    UserService(Util util) throws UnknownHostException {
        this.util = util;
        client = new PreBuiltTransportClient(Settings.EMPTY)
                .addTransportAddress(new TransportAddress(InetAddress.getByName("localhost"), 9300));
    }
    public void createLendRequest(LendRequest lendRequest) throws IOException {
        String requestId = UUID.randomUUID().toString();
        System.out.println("Called");
        System.out.println(lendRequest.toString());
//         Object ob =
        System.out.println("Object built");
        IndexResponse response = client.prepareIndex("twitter", "_doc", requestId)
                .setSource(
                        jsonBuilder()
                                .startObject()
                                .field("address",lendRequest.getAddress())
                                .field("type",lendRequest.getType())
                                .field("costPerDay", lendRequest.getCostPerDay())
                                .field("contactNumber", lendRequest.getContactNumber())
                                .field("vehicleAvailability", lendRequest.getVehicleAvailability())
//                .field("id", requestId)
                                .field("lattitude", lendRequest.getLattitude())
                                .field("longitude", lendRequest.getLongitude())
                                .field("email", lendRequest.getEmail())
                                .endObject()
                )
                .get();
        System.out.println("Finished");
        return;
    }
    public String retrieveLendRequest(String email) throws IOException {
        System.out.println();
        System.out.println(email);
        System.out.println();
        QueryBuilder emailFilter = QueryBuilders.termQuery("email.keyword",email);
        QueryBuilder query = QueryBuilders.boolQuery().must(emailFilter);
        SearchRequestBuilder searchQ = client.prepareSearch().setIndices("twitter").setQuery(query);
        SearchResponse searchResponse = searchQ.execute().actionGet();
        System.out.println(searchResponse.toString());
        return searchResponse.toString();
//        JSONObject SRJSON = new JSONObject(searchResponse.toString());
//        SearchHit[] searchHits = searchResponse.getHits().getHits();
//        for (SearchHit searchHit : searchHits) {
//            return searchHit.getSourceAsString();
////            return js;
////            System.out.println(searchHit.getSourceAsString());
//        }
//        return "";
    }

    public void toggleRequest(String postId, String status) throws IOException, ExecutionException, InterruptedException {
        System.out.println("Update called " + postId + " " + status);
        UpdateRequest updateRequest = new UpdateRequest();
        updateRequest.index("twitter");
        updateRequest.type("_doc");
        updateRequest.id(postId);
        updateRequest.doc(jsonBuilder()
                .startObject()
                .field("vehicleAvailability", status)
                .endObject());
        client.update(updateRequest).get();
        System.out.println("Updated");
    }

    public String retrieveBorrowRequest(Double lattitude,Double longitude, Integer distance) throws IOException {
        double lengthOfLattitdePerDegree = 111;
        double lengthOfLongitudePerDegree = Math.cos(Math.toRadians(lattitude)) * 111.321;
//        System.out.println("long : " + lengthOfLongitudePerDegree + " Distance : " + distance);
        double lattitudeRad = distance/lengthOfLattitdePerDegree;
        double longitudeRad = distance/lengthOfLongitudePerDegree;
//        lattitudeRad /= 1.1;
//        longitudeRad /= 1.1;
        double fromLat = lattitude - lattitudeRad;
        double toLat = lattitude + lattitudeRad;
        double fromLong = longitude - longitudeRad;
        double toLong = longitude + longitudeRad;

        System.out.println("Latitude range : " + fromLat + " to " + toLat);
        System.out.println("Longitude range : " + fromLong + " to " + toLong);
        QueryBuilder latConstraint = QueryBuilders
                .rangeQuery("lattitude")
                .from(fromLat)
                .to(toLat)
                .includeLower(true)
                .includeUpper(true);
        QueryBuilder longConstraint = QueryBuilders
                .rangeQuery("longitude")
                .from(fromLong)
                .to(toLong)
                .includeLower(true)
                .includeUpper(true);
        QueryBuilder statusFilter = QueryBuilders.termQuery("vehicleAvailability.keyword","Available");

        QueryBuilder query = QueryBuilders.boolQuery().must(latConstraint).must(longConstraint).must(statusFilter);
        SearchRequestBuilder searchQ = client.prepareSearch().setIndices("twitter").setQuery(query);
        SearchResponse searchResponse = searchQ.execute().actionGet();
        System.out.println(searchResponse.toString());

        return searchResponse.toString();
//        JSONObject SRJSON = new JSONObject(searchResponse.toString());
//        SearchHit[] searchHits = searchResponse.getHits().getHits();
//        for (SearchHit searchHit : searchHits) {
//            return searchHit.getSourceAsString();
////            return js;
////            System.out.println(searchHit.getSourceAsString());
//        }
//        return "";
    }
    public void sendNotification(String borrowersEmail, String lendersEmail, String postId) {
//        System.out.println("Called emailing api");

        GetResponse response = client.prepareGet("twitter", "_doc", postId).get();
        System.out.println(response.toString());
//        return;
//        JSONObject SRJSON = new JSONObject(response.toString());
//        SearchHit[] searchHits = searchResponse.getHits().getHits();
        JSONObject js = null;
        js = new JSONObject(response.getSourceAsString());
//            return js;
//            System.out.println(searchHit.getSourceAsString());
//        return "";

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(lendersEmail);
            helper.setText("User : " + borrowersEmail + " showed interest in your vehicle, vehicle id : " + postId + ", vehicle type : " + js.get("type"));
            helper.setSubject("Somebody showed interest in your vehicle");
        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println("Error while sending mail ..");
        }
        sender.send(message);
        System.out.println("Mail sent successfully");
    }
}
