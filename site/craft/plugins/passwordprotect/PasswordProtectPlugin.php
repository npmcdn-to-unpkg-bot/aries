<?php
namespace Craft;
class PasswordProtectPlugin extends BasePlugin
{
	public function getName()
	{
		return 'Password Protect for '.craft()->getSiteName();
	}
	public function getDescription()
	{
		return 'Password protect entries.';
	}
	public function getDocumentationUrl()
	{
		return 'http://dandelion-burdock.com';
	}
	public function getVersion()
	{
		return '1.0';
	}
	public function getSchemaVersion()
	{
		return '0.0.0';
	}
	public function getDeveloper()
	{
		return craft()->getSiteName();
	}
	public function getDeveloperUrl()
	{
		return 'http://dandelion-burdock.com';
	}
}
