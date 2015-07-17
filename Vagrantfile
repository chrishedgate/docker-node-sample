# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.define "default", autostart: false do |default|
    default.vm.box = "yungsang/boot2docker"

    default.vm.network "private_network", ip: "192.168.33.10"
    default.vm.network "forwarded_port", guest: 6379, host: 6379
    default.vm.network "forwarded_port", guest: 8081, host: 8081
    default.vm.network "forwarded_port", guest: 8082, host: 8082

    default.vm.synced_folder ".", "/usr/local/src", type: "nfs"

    default.vm.provider "virtualbox" do |virtualbox|
      virtualbox.memory = 2048
    end

    default.vm.provision "docker" do |docker|
      # Docker provider tries to pull image from Docker Hub even when existing locally, so we build instead
      # Will be fixed in 1.7.4
      # docker.build_image "/usr/local/src/serviceA", args: "-t chrishedgate/vagrant_docker_sample_service_a"
      # docker.build_image "/usr/local/src/serviceB", args: "-t chrishedgate/vagrant_docker_sample_service_b"
    end

    default.ssh.insert_key = false
    default.ssh.username = "docker"
    default.ssh.password = "tcuser"
  end

  config.vm.define "redis" do |redis|
    redis.vm.provider "docker" do |docker|
      docker.image = "redis"
      docker.name  = "redis"
      docker.ports = ["6379:6379"]
      docker.vagrant_vagrantfile = __FILE__
    end
  end

  config.vm.define "serviceA" do |serviceA|
    serviceA.vm.provider "docker" do |docker|
      # Docker provider tries to pull image from Docker Hub even when existing locally, so we build instead
      # Will be fixed in 1.7.4
      # docker.image = "chrishedgate/vagrant_docker_sample_service_a"
      docker.build_dir = "./serviceA"
      docker.build_args = ["-t", "vagrant_docker_sample_service_a"]
      docker.name  = "serviceA"
      docker.ports = ["8081:8081"]
      docker.link("redis:redis")
      docker.vagrant_vagrantfile = __FILE__
    end
  end

  config.vm.define "serviceB" do |serviceB|
    serviceB.vm.provider "docker" do |docker|
      # Docker provider tries to pull image from Docker Hub even when existing locally, so we build instead
      # Will be fixed in 1.7.4
      # docker.image = "chrishedgate/vagrant_docker_sample_service_b"
      docker.build_dir = "./serviceB"
      docker.build_args = ["-t", "vagrant_docker_sample_service_b"]
      docker.name  = "serviceB"
      docker.ports = ["8082:8082"]
      docker.link("redis:redis")
      docker.vagrant_vagrantfile = __FILE__
    end
  end
end
