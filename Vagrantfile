Vagrant.configure('2') do |conf|
  ENV['ZONE'] ||= 'America/Detroit'

  is_arm64 = (`uname -m` == 'arm64' || `uname -m` == 'aarch64' || `command -v sysctl >/dev/null && arch -64 sh -c "sysctl -in sysctl.proc_translated"`.strip == '0')
  zsh = File.file?(File.expand_path '~/.zshrc')

  conf.vm.box = 'debian/contrib-buster64'
  conf.vm.box = 'bento/debian-11.2-arm64' if is_arm64
  conf.vm.hostname = File.basename(Dir.pwd) + '.test'
  conf.vm.network 'private_network', type: 'dhcp'
  [
    '~/.gitconfig',
    '~/.gitignore',
    '~/.npmrc',
    '~/.vimrc',
    '~/.zprofile',
    '~/.zshenv',
    '~/.zshrc',
  ].each{|pFile| conf.vm.provision 'file', source: pFile, destination: pFile if File.file?(File.expand_path pFile)}
  conf.vm.provision 'shell', inline: 'echo "options single-request-reopen" >>/etc/resolv.conf' if is_arm64
  conf.vm.provision 'shell', path: 'https://github.com/mgsisk/providence/releases/download/v0.1.6/provisioner.sh', env: {
    'LOGIN_SHELL_CNF' => ('.zprofile' if zsh),
    'LOGIN_SHELL' => ('/bin/zsh' if zsh),
    'ZONE' => ENV['ZONE'],
}.compact

  conf.trigger.before :destroy, :halt, :reload, :suspend do |t|
    t.info = 'Updating system hosts...'
    t.ruby do |env, vm|
      system("sudo sed -i '' '/ # vagrant-#{vm.id}$/d' /etc/hosts")
  end
end

  conf.trigger.after :reload, :resume, :up do |t|
    t.info = 'Updating sytstem hosts...'
    t.ruby do |env, vm|
      hostname = `vagrant ssh #{vm.name} -c 'hostname -f' -- -q`.chomp
      ip_address = `vagrant ssh #{vm.name} -c 'hostname -I | cut -d" " -f2' -- -q`.chomp
      system("echo '#{ip_address} #{hostname} sys.#{hostname} # vagrant-#{vm.id}' | sudo tee -a /etc/hosts >/dev/null")
    end
  end
end
