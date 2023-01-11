package com.diabetes.common.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "auth-redirection")
public class RedirectProperties {

    private String successUrl;
    private String failureUrl;
}
