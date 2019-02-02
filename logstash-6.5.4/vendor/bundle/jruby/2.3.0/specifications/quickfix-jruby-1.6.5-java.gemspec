# -*- encoding: utf-8 -*-
# stub: quickfix-jruby 1.6.5 java lib

Gem::Specification.new do |s|
  s.name = "quickfix-jruby".freeze
  s.version = "1.6.5"
  s.platform = "java".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Chris Busbey".freeze]
  s.date = "2017-09-08"
  s.description = "QuickFIX/J packaged as a gem for JRuby".freeze
  s.email = "support@connamara.com".freeze
  s.extra_rdoc_files = ["LICENSE.txt".freeze, "README.md".freeze]
  s.files = ["LICENSE.txt".freeze, "README.md".freeze]
  s.homepage = "http://github.com/connamara/quickfix-jruby".freeze
  s.licenses = ["GPL".freeze]
  s.rubygems_version = "2.6.13".freeze
  s.summary = "Gemified QuickFIX/J".freeze

  s.installed_by_version = "2.6.13" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<jeweler>.freeze, ["~> 1.8"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.1"])
    else
      s.add_dependency(%q<jeweler>.freeze, ["~> 1.8"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.1"])
    end
  else
    s.add_dependency(%q<jeweler>.freeze, ["~> 1.8"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.1"])
  end
end
