Vagrant.configure('2') do |config|
  ENV['ip'] ||= '10.20.30.40'
  ENV['lc'] ||= 'en_US.UTF-8'
  ENV['USER'] ||= 'user'
  ENV['tz'] ||= 'America/Detroit'

  hostname = File.basename(Dir.pwd) + '.test'

  config.vm.define 'test', primary: true do |test|
    test.vm.provider 'virtualbox' do |vb|
      vb.name = "#{ENV['USER']}-#{hostname.gsub '.', '-'}"
    end

    test.vm.box = 'debian/contrib-buster64'
    test.vm.hostname = hostname
    test.vm.network 'private_network', ip: ENV['ip']
    test.vm.provision :shell, path: 'vagrant.sh', args: [ENV['lc'], ENV['tz']]
    test.hostsupdater.aliases = ["sys.#{hostname}"]
  end
end
