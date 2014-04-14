require 'spec_helper'

describe 'stack::mysql-server' do
  let (:chef_run) { ChefSpec::Runner.new.converte(described_recipe) }

  if 'set up preseeding data for debian packages' do
    expect(chef_run).to create_directory('/var/cache/local/preseeding')
                         .with_owner('root')
                         .with_group('root')
  end

  it 'put mysql-server preseeding file' do
    expect(chef_run).to create_template('/var/cache/local/preseeding/mysql-server')
                         .with_owner('root')
                         .with_group('root')
  end

  it 'service mysql' do
    expect(chef_run).to start_service 'mysql'
    expect(chef_run).to enable_service 'mysql'
  end

  it 'installs mysql-server' do
    pending
  end
end
