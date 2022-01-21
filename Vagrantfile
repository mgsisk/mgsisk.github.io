Vagrant.configure('2') do |config|
  ENV['ARCH'] ||= ''
  ENV['HOST'] ||= '_ sys._'
  ENV['ZONE'] ||= 'America/Detroit'

  bash_aliases = File.join(Dir.home, '.bash_aliases')
  bash_profile = File.join(Dir.home, '.bash_profile')
  gitconfig = File.join(Dir.home, '.gitconfig')
  gitignore = File.join(Dir.home, '.gitignore')
  npmrc = File.join(Dir.home, '.npmrc')
  vimrc = File.join(Dir.home, '.vimrc')

  config.vm.box = 'debian/contrib-buster64'
  config.vm.box = 'bento/debian-11.2-arm64' if ENV['ARCH'].include? 'arm'
  config.vm.hostname = File.basename(Dir.pwd) + '.test'
  config.vm.network 'private_network', type: 'dhcp'
  config.vm.provision 'shell', inline: 'echo "options single-request-reopen" >> /etc/resolv.conf' if ENV['ARCH'].include? 'arm'
  config.vm.provision 'file', source: bash_aliases, destination: '~/.bash_aliases' if File.file?(bash_aliases)
  config.vm.provision 'file', source: bash_profile, destination: '~/.bash_profile' if File.file?(bash_profile)
  config.vm.provision 'file', source: gitconfig, destination: '~/.gitconfig' if File.file?(gitconfig)
  config.vm.provision 'file', source: gitignore, destination: '~/.gitignore' if File.file?(gitignore)
  config.vm.provision 'file', source: npmrc, destination: '~/.npmrc' if File.file?(npmrc)
  config.vm.provision 'file', source: vimrc, destination: '~/.vimrc' if File.file?(vimrc)
  config.vm.provision 'shell', path: 'https://github.com/mgsisk/providence/releases/download/v0.1.2/provisioner.sh', env: {
    'ZONE' => ENV['ZONE'],
  }

  config.trigger.after :reload, :resume, :up do |trig|
    trig.info = 'Updating sytstem hosts...'
    trig.ruby do |env, vm|
      hostname = `vagrant ssh #{vm.name} -c 'hostname -f' -- -q`.chomp
      ip_address = `vagrant ssh #{vm.name} -c 'hostname -I | cut -d " " -f 2' -- -q`.chomp

      system("echo '#{ip_address} #{ENV['HOST'].gsub('_', hostname)} # vagrant-#{vm.id}' | sudo tee -a /etc/hosts >/dev/null") unless Vagrant::Util::Platform.windows?
      if Vagrant::Util::Platform.windows?
        require 'win32ole'
        hFile = File.expand_path('system32/drivers/etc/hosts', ENV['windir'])
        shell = WIN32OLE.new('Shell.Application')
        shell.ShellExecute("echo #{ip_address} #{ENV['HOST'].gsub('_', hostname)} # vagrant-#{vm.id}>> #{hFile}", nil, nil, 'runas')
      end
    end
  end

  config.trigger.before :destroy, :reload do |trig|
    delete_hosts(trig)
  end

  config.trigger.after :halt, :suspend do |trig|
    delete_hosts(trig)
  end
end

def delete_hosts(trig)
  trig.info = 'Updating system hosts...'
  trig.ruby do |env, vm|
    system("sudo sed -i '' '/ # vagrant-#{vm.id}$/d' /etc/hosts") unless Vagrant::Util::Platform.windows?
    if Vagrant::Util::Platform.windows?
      require 'win32ole'
      hFile = File.expand_path('system32/drivers/etc/hosts', ENV['windir'])
      shell = WIN32OLE.new('Shell.Application')
      shell.ShellExecute("findstr /v /c:\" # vagrant-#{vm.id}$\" #{hFile} >> #{hFile}", nil, nil, 'runas')
    end
  end
end
