//package com.camunda.poc.starter.plugin.sso.keycloak;

//import java.util.Collections;

//import org.camunda.bpm.webapp.impl.security.auth.ContainerBasedAuthenticationFilter;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingClass;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Profile;
//import org.springframework.core.annotation.Order;
//import org.springframework.web.context.request.RequestContextListener;

/**
 * Camunda Web application SSO configuration for usage with Auth0IdentityProviderPlugin.
 */
//@Profile("sso")
//@ConditionalOnMissingClass("org.springframework.test.context.junit4.SpringJUnit4ClassRunner")
//@Configuration
//public class WebAppSecurityConfig {

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//
//    	http
//    	.csrf().ignoringAntMatchers("/api/**")
//    	.and()
//    	.csrf().ignoringAntMatchers("/parse/**")
//    	.and()
//        .antMatcher("/**")
//        .authorizeRequests()
//          .antMatchers("/app/**")
//          .authenticated()
//        .anyRequest()
//          .permitAll()
//        ;
//
//    }

//	@SuppressWarnings({ "rawtypes", "unchecked" })
//	@Bean
//    public FilterRegistrationBean containerBasedAuthenticationFilter(){
//
//        FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
//        filterRegistration.setFilter(new ContainerBasedAuthenticationFilter());
//        filterRegistration.setInitParameters(Collections.singletonMap("authentication-provider", "com.camunda.react.starter.keycloak.sso.KeycloakAuthenticationProvider"));
//        filterRegistration.setOrder(101); // make sure the filter is registered after the Spring Security Filter Chain
//        filterRegistration.addUrlPatterns("/app/*");
//        filterRegistration.addUrlPatterns("/home/*");
//        return filterRegistration;
//    }

//	@Bean
//	@Order(0)
//	public RequestContextListener requestContextListener() {
//	    return new RequestContextListener();
//	}

	/**
	 * Configures the OAuth2 TokenStore for Redis Cache usage.
	 * @param redisConnectionFactory the Redis Connection Factoryf
	 * @return Redis prepared TokenStore
	 */
	/* Redis Session Cache not yet in use
	@Bean
	@Primary
	public TokenStore tokenStore(RedisConnectionFactory redisConnectionFactory) {
	    return new RedisTokenStore(redisConnectionFactory);
	}
	*/
//}