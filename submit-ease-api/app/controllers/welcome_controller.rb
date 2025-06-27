class WelcomeController < ApplicationController

    before_action :authenticate_user!
    
    def index
        render json: {message: "Binvendos"}
    end

     def users
        render json: User.all
    end
end
