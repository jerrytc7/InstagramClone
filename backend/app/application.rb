class Application

  def call(env)
    resp = Rack::Response.new
    req = Rack::Request.new(env)

    if req.path.match(/games/)  && req.get?
      games = Game.all
      return [200, { 'Content-Type' => 'application/json' }, [ games.to_json ]]
    elsif req.path.match(/games/)  && req.post?
      data = JSON.parse req.body.read
      game = Game.create(data)
      return [200, { 'Content-Type' => 'application/json' }, [ games.to_json ]]
    elsif req.path.match(/games/)  && req.delete?
      id = req.path_info.split('/games/').last
      game = Game.find(id)
      game.delete
      return [200, { 'Content-Type' => 'application/json' }, [ {message: 'Task deleted'}.to_json ]]
    else
      resp.write "Path Not Found"

    end

    resp.finish
  end

end
