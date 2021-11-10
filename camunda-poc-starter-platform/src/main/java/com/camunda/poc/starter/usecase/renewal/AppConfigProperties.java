package com.camunda.poc.starter.usecase.renewal;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Profile;

@Profile("renewal")
@ConfigurationProperties(prefix="app")
public class AppConfigProperties implements Serializable {

	private static final long serialVersionUID = 635898182449462746L;
	private DataSource dataSource = new DataSource();
	private List<Security> security = new ArrayList<Security>(Collections.singleton(new Security()));
	private Cron cron = new Cron();
	private List<GracePeriodSetting> gracePeriodSettings = new ArrayList<GracePeriodSetting>(Collections.singleton(new GracePeriodSetting()));
	private RenewalSetting renewalSetting = new RenewalSetting();
	private String systemEmail;
	private String managerEmail;
	private String defaultFromEmail;
	private String mailServerHost;
	private Integer mailServerPort;
	private String mailServerDefaultFrom;
	private String mailServerUserName;
	private String mailServerPassword;
	private Boolean mailServerUseTls;
	
	public String getMailServerHost() {
		return mailServerHost;
	}
	public void setMailServerHost(String mailServerHost) {
		this.mailServerHost = mailServerHost;
	}
	public Integer getMailServerPort() {
		return mailServerPort;
	}
	public void setMailServerPort(Integer mailServerPort) {
		this.mailServerPort = mailServerPort;
	}
	public String getMailServerDefaultFrom() {
		return mailServerDefaultFrom;
	}
	public void setMailServerDefaultFrom(String mailServerDefaultFrom) {
		this.mailServerDefaultFrom = mailServerDefaultFrom;
	}
	public String getMailServerUserName() {
		return mailServerUserName;
	}
	public void setMailServerUserName(String mailServerUserName) {
		this.mailServerUserName = mailServerUserName;
	}
	public String getMailServerPassword() {
		return mailServerPassword;
	}
	public void setMailServerPassword(String mailServerPassword) {
		this.mailServerPassword = mailServerPassword;
	}
	public Boolean isMailServerUseTls() {
		return mailServerUseTls;
	}
	public void setMailServerUseTls(Boolean mailServerUseTls) {
		this.mailServerUseTls = mailServerUseTls;
	}
	public String getDefaultFromEmail() {
		return defaultFromEmail;
	}
	public void setDefaultFromEmail(String defaultFromEmail) {
		this.defaultFromEmail = defaultFromEmail;
	}
	public String getManagerEmail() {
		return managerEmail;
	}
	public void setManagerEmail(String managerEmail) {
		this.managerEmail = managerEmail;
	}
	public String getSystemEmail() {
		return systemEmail;
	}
	public void setSystemEmail(String systemEmail) {
		this.systemEmail = systemEmail;
	}
	public DataSource getDataSource() {
		return dataSource;
	}
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public List<Security> getSecurity() {
		return security;
	}
	public void setSecurity(List<Security> security) {
		this.security = security;
	}
	public Cron getCron() {
		return cron;
	}
	public void setCron(Cron cron) {
		this.cron = cron;
	}
	public List<GracePeriodSetting> getGracePeriodSettings() {
		return gracePeriodSettings;
	}
	public void setGracePeriodSettings(List<GracePeriodSetting> settings) {
		this.gracePeriodSettings = settings;
	}
	public RenewalSetting getRenewalSetting() {
		return renewalSetting;
	}
	public void setRenewalSetting(RenewalSetting renewalSetting) {
		this.renewalSetting = renewalSetting;
	}

	public static class DataSource implements Serializable {
		private static final long serialVersionUID = 6381943492397898649L;
		private String url;
		private String password;
		private String username;
		private String driverClassName;
		public String getUrl() {
			return url;
		}
		public void setUrl(String url) {
			this.url = url;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getDriverClassName() {
			return driverClassName;
		}
		public void setDriverClassName(String dataSourceDriverClassName) {
			this.driverClassName = dataSourceDriverClassName;
		}
	}

    public static class Security implements Serializable {
		private static final long serialVersionUID = 2784581226410821489L;
		private String username;
        private String password;
        private List<String> roles = new ArrayList<String>(Collections.singleton("USER"));
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public List<String> getRoles() {
			return roles;
		}
		public void setRoles(List<String> roles) {
			this.roles = roles;
		}

    }

    public static class Cron implements Serializable {
		private static final long serialVersionUID = 6200944443090974874L;
		private String renewalStart;
    	private String renewalClean;
    	private int renewalKickoffBufferDays;

		public String getRenewalStartCron() {
			return renewalStart;
		}
		public void setRenewalStartCron(String renewalStartCron) {
			this.renewalStart = renewalStartCron;
		}
		public String getRenewalCleanCron() {
			return renewalClean;
		}
		public void setRenewalCleanCron(String renewalCleanCron) {
			this.renewalClean = renewalCleanCron;
		}
		public int getRenewalKickoffBufferDays() {
			return renewalKickoffBufferDays;
		}
		public void setRenewalKickoffBufferDays(int renewalKickoffBufferDays) {
			this.renewalKickoffBufferDays = renewalKickoffBufferDays;
		}
    }

    public static class GracePeriodSetting implements Serializable {
    	public GracePeriodSetting(){}
    	public GracePeriodSetting(String cron, int days){
    		this.cron = cron;
    		this.bufferDays = days;
    	}

		private static final long serialVersionUID = 8724721924500116380L;
		private String cron;
    	private int bufferDays;
		public String getCron() {
			return cron;
		}
		public void setCron(String cron) {
			this.cron = cron;
		}
		public int getBufferDays() {
			return bufferDays;
		}
		public void setBufferDays(int bufferDays) {
			this.bufferDays = bufferDays;
		}
    }

    public static class RenewalSetting implements Serializable {
 		private static final long serialVersionUID = 111291833570892146L;
		private int leaseExpirationBufferDays;

		public int getRenewalExpirationBufferDays() {
			return leaseExpirationBufferDays;
		}

		public void setRenewalExpirationBufferDays(int leaseExpirationBufferDays) {
			this.leaseExpirationBufferDays = leaseExpirationBufferDays;
		}
    }
}
