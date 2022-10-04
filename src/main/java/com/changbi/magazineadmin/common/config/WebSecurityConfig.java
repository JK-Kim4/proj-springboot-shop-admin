package com.changbi.magazineadmin.common.config;

import com.changbi.magazineadmin.common.handler.LoginFailHandler;
import com.changbi.magazineadmin.common.handler.LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
@Slf4j
public class WebSecurityConfig {

    private final LoginFailHandler loginFailHandler;
    private final LoginSuccessHandler loginSuccessHandler;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.headers().frameOptions().disable();
        http.httpBasic().disable().cors();

        http.authorizeRequests()
                /*.antMatchers().permitAll()*/
                .antMatchers("**").permitAll() //개발환경
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/login/auth")
                .failureHandler(loginFailHandler)
                .defaultSuccessUrl("/", true)
                .successHandler(loginSuccessHandler)
                .usernameParameter("adminId")
                .passwordParameter("adminPassword")
                .and()
                .logout()
                .invalidateHttpSession(true).deleteCookies("JSESSIONID")
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login")
                .and()
                .sessionManagement()
                .maximumSessions(1)
                .maxSessionsPreventsLogin(false);

        http.csrf().disable();

        return http.build();
    }
}
