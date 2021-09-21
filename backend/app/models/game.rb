class Game < ActiveRecord::Base
    belongs_to :console

    @@all = []

    def self.name_capitalized
        @@all = Game.all.map{|game| game.name.upcase}
    end
end