package hackathon.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchAutoConfiguration;
import org.springframework.boot.autoconfigure.elasticsearch.rest.RestClientAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

import java.net.UnknownHostException;

@SpringBootApplication(exclude={ElasticsearchAutoConfiguration.class, RestClientAutoConfiguration.class})
@ComponentScan(value = "hackathon")
public class RideSearchLend {
	public static void main(String[] args) throws UnknownHostException {

		SpringApplication.run(RideSearchLend.class, args);
	}

}
