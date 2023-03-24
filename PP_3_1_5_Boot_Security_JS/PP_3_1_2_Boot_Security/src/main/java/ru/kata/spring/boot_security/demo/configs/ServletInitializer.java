package ru.kata.spring.boot_security.demo.configs;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import ru.kata.spring.boot_security.demo.SpringBootSecurityDemoApplication;

public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(SpringBootSecurityDemoApplication.class);
    }

}
