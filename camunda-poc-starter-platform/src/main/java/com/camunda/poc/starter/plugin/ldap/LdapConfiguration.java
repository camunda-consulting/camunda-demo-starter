package com.camunda.poc.starter.plugin.ldap;


import com.sun.org.apache.xpath.internal.operations.Bool;
import org.camunda.bpm.engine.impl.plugin.AdministratorAuthorizationPlugin;
import org.camunda.bpm.identity.impl.ldap.plugin.LdapIdentityProviderPlugin;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("ldap")
@Configuration
public class LdapConfiguration {

    @Value("${camunda.ldap.serverUrl}")
    private String serverUrl;

    @Value("${camunda.ldap.allowAnonymousLogin:false}")
    private Boolean allowAnonymousLogin;

    @Value("${camunda.ldap.authorizationCheckEnabled:true}")
    private Boolean authorizationCheckEnabled;

    @Value("${camunda.ldap.acceptUntrustedCertificates:false}")
    private Boolean acceptUntrustedCertificates;

    @Value("${camunda.ldap.useSsl:true}")
    private Boolean useSsl;

    @Value("${camunda.ldap.securityAuthentication:simple}")
    private String securityAuthentication;


    //LDAP Query Params
    @Value("${camunda.ldap.managerDn}")
    private String managerDn;

    @Value("${camunda.ldap.managerPassword}")
    private String managerPassword;

    @Value("${camunda.ldap.baseDn}")
    private String baseDn;

    @Value("${camunda.ldap.userSearchBase}")
    private String userSearchBase;

    @Value("${camunda.ldap.userSearchFilter}")
    private String userSearchFilter;

    @Value("${camunda.ldap.userIdAttribute}")
    private String userIdAttribute;

    @Value("${camunda.ldap.userFirstnameAttribute}")
    private String userFirstnameAttribute;

    @Value("${camunda.ldap.userLastnameAttribute}")
    private String userLastnameAttribute;

    @Value("${camunda.ldap.userEmailAttribute}")
    private String userEmailAttribute;

    @Value("${camunda.ldap.userPasswordAttribute}")
    private String userPasswordAttribute;

    @Value("${camunda.ldap.groupSearchBase}")
    private String groupSearchBase;

    @Value("${camunda.ldap.groupSearchFilter}")
    private String groupSearchFilter;

    @Value("${camunda.ldap.groupIdAttribute}")
    private String groupIdAttribute;

    @Value("${camunda.ldap.groupNameAttribute}")
    private String groupNameAttribute;

    @Value("${camunda.ldap.groupMemberAttribute}")
    private String groupMemberAttribute;

//    @Value("${camunda.ldap.groupTypeAttribute}")
//    private String groupTypeAttribute;

    @Value("${camunda.ldap.administratorUserName}")
    private String administratorUserName;

    @Bean
    public LdapIdentityProviderPlugin ldapIdentityProviderPlugin(){
        LdapIdentityProviderPlugin plugin = new LdapIdentityProviderPlugin();

        plugin.setServerUrl(serverUrl);
        plugin.setAcceptUntrustedCertificates(acceptUntrustedCertificates);
        plugin.setAllowAnonymousLogin(allowAnonymousLogin);
        plugin.setAuthorizationCheckEnabled(authorizationCheckEnabled);

        plugin.setUseSsl(useSsl);
        plugin.setSecurityAuthentication(securityAuthentication);
        plugin.setBaseDn(baseDn);
        plugin.setManagerDn(managerDn);
        plugin.setManagerPassword(managerPassword);

//        plugin.setUserSearchBase(userSearchBase!=null?userSearchBase:"");
        plugin.setUserSearchFilter(userSearchFilter);
        plugin.setUserIdAttribute(userIdAttribute);
        plugin.setUserFirstnameAttribute(userFirstnameAttribute);
        plugin.setUserLastnameAttribute(userLastnameAttribute);
        plugin.setUserEmailAttribute(userEmailAttribute);
        plugin.setUserPasswordAttribute(userPasswordAttribute);

//        plugin.setGroupSearchBase(groupSearchBase);
        plugin.setGroupSearchFilter(groupSearchFilter);
        plugin.setGroupIdAttribute(groupIdAttribute);
        plugin.setGroupNameAttribute(groupNameAttribute);
        plugin.setGroupMemberAttribute(groupMemberAttribute);

        plugin.setAcceptUntrustedCertificates(acceptUntrustedCertificates);


        return plugin;
    }


    @Bean
    public AdministratorAuthorizationPlugin administratorAuthorizationPlugin(){
        AdministratorAuthorizationPlugin plugin = new AdministratorAuthorizationPlugin();

        plugin.setAdministratorUserName(administratorUserName);

        return plugin;
    }
}