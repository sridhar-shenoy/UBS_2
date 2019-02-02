# -*- encoding: utf-8 -*-
# stub: logstash-filter-fix_protocol 0.3.3 ruby lib

Gem::Specification.new do |s|
  s.name = "logstash-filter-fix_protocol".freeze
  s.version = "0.3.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "logstash_group" => "filter", "logstash_plugin" => "true" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Connamara Systems".freeze]
  s.date = "2017-09-15"
  s.description = "Put your financial application logs to work with logstash FIX filtering".freeze
  s.email = ["info@connamara.com".freeze]
  s.homepage = "https://github.com/connamara/logstash-filter-fix_protocol".freeze
  s.licenses = ["Apache License (2.0)".freeze]
  s.rubygems_version = "2.6.13".freeze
  s.summary = "FIX Protocol Logstash Filter".freeze

  s.installed_by_version = "2.6.13" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<logstash-core>.freeze, [">= 5.0.0"])
      s.add_runtime_dependency(%q<logstash-input-generator>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<activesupport>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<quickfix-jruby>.freeze, [">= 1.6.5", "~> 1.6"])
      s.add_development_dependency(%q<logstash-devutils>.freeze, [">= 0"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.8"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
      s.add_development_dependency(%q<pry>.freeze, [">= 0"])
    else
      s.add_dependency(%q<logstash-core>.freeze, [">= 5.0.0"])
      s.add_dependency(%q<logstash-input-generator>.freeze, [">= 0"])
      s.add_dependency(%q<activesupport>.freeze, [">= 0"])
      s.add_dependency(%q<quickfix-jruby>.freeze, [">= 1.6.5", "~> 1.6"])
      s.add_dependency(%q<logstash-devutils>.freeze, [">= 0"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.8"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_dependency(%q<rspec>.freeze, [">= 0"])
      s.add_dependency(%q<pry>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<logstash-core>.freeze, [">= 5.0.0"])
    s.add_dependency(%q<logstash-input-generator>.freeze, [">= 0"])
    s.add_dependency(%q<activesupport>.freeze, [">= 0"])
    s.add_dependency(%q<quickfix-jruby>.freeze, [">= 1.6.5", "~> 1.6"])
    s.add_dependency(%q<logstash-devutils>.freeze, [">= 0"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.8"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_dependency(%q<rspec>.freeze, [">= 0"])
    s.add_dependency(%q<pry>.freeze, [">= 0"])
  end
end
