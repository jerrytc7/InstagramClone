class Application

  def call(env)
    resp = Rack::Response.new
    req = Rack::Request.new(env)

    if req.path.match(/games/)  && req.get?
      games = Game.all
      games_with_console = games.map do |game|
        {id: game.id, name: game.name, image_url: game.image_url, console:game.console.name}
      end
      return [200, { 'Content-Type' => 'application/json' }, [ games_with_console.to_json ]]
    elsif req.path.match(/consoles/)  && req.get?
        consoles = Console.all
        return [200, { 'Content-Type' => 'application/json' }, [ consoles.to_json ]]
    elsif req.path.match(/games/)  && req.post?
      data = JSON.parse req.body.read
      puts data
      game = Game.create(data)
      game={id: game.id, name: game.name, image_url: game.image_url, console:game.console.name}
      return [200, { 'Content-Type' => 'application/json' }, [ game.to_json ]]
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
