

#启动虚拟网络
docker network create wpt-net

#启动wpt-server
docker run -d -p 4000:80 --name wpt-server --network wpt-net iteratec/wptserver


#启动wpt-agent
docker run -d --name wpt-agent --network wpt-net -e SERVER_URL=http://wpt-server/work/ -e LOCATION=Test -e BROWSERS=Chrome -e SHAPER=none webpagetest/agent 
