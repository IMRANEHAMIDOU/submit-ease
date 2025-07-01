class OrganizationsController < ApplicationController

    def index
        organizations = Organization.all 

        render json: organizations.as_json
    end
end
