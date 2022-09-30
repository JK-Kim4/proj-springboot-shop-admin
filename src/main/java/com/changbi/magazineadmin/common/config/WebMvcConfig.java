//package com.changbi.magazineadmin.common.config;
//
//import com.navercorp.lucy.security.xss.servletfilter.XssEscapeServletFilter;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebMvcConfig implements WebMvcConfigurer {
//
//    /*Session Interceptor 추가*/
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//
//        registry.addInterceptor(sessionInterceptor())
//                .addPathPatterns("/**")
//                .excludePathPatterns("/login", "/login/**", "/signUp",
//                        "/assets/**", "/js/**", "/images/**",
//                        "/moniter/query", "/user/send/validation");
//    }
//
//    // 어드민페이지 CORS 설정 없음
//    /*@Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowedMethods("GET", "POST")
//                .maxAge(3000);
//    }*/
//
//    //Lucy Xss filter 적용
//    @Bean
//    public FilterRegistrationBean<XssEscapeServletFilter> getFilterRegistrationBean(){
//        FilterRegistrationBean<XssEscapeServletFilter> registrationBean = new FilterRegistrationBean<>();
//        registrationBean.setFilter(new XssEscapeServletFilter());
//        registrationBean.setOrder(1);
//        registrationBean.addUrlPatterns("/*");
//        return registrationBean;
//    }
//
//}
