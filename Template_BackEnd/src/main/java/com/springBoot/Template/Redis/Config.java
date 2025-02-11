//package com.springBoot.Template.Redis;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.redis.cache.RedisCacheManager;
//import org.springframework.data.redis.connection.RedisConnectionFactory;
//import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
//import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
//
// Redis Server Configuration Class
//@Configuration
//public class Config {
//
//    redisHost Value Get For Application Properties
//    @Value("${redis.host}")
//    private String redisHost;
//
//    redisPort Value Get For Application Properties
//    @Value("${redis.port}")
//    private int redisPort;
//
//    LettuceConnectionFactory For Redis Server that using RedisStandaloneConfiguration Method
//    @Bean
//    public LettuceConnectionFactory redisConnectingFactory() {
//        RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration(redisHost, redisPort);
//        return new LettuceConnectionFactory(configuration);
//    }
//
//    RedisCacheManager for Redis Server Method
//    @Bean
//    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
//        return RedisCacheManager.create(connectionFactory);
//    }
//
//}
//
//