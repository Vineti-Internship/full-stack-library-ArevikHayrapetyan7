class AutorsController < ApplicationController
  before_action :require_login, except: [:index, :show, :create]

  # GET /autors
  def index
    @autors = Autor.all

    render json: @autors
  end

  # GET /autors/1
  def show
    render json: @autor
  end

  # POST /autors
  def create

    @autor = Autor.new(aparams)

    if @autor.save
      render json: {token: @autor.token}
    else
      render json: @autor.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /autors/1
  def update
    if @autor.update(aparams)
      render json: @autor
    else
      render json: @autor.errors, status: :unprocessable_entity
    end
  end

  # DELETE /autors/1
  def destroy
    @autor.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_autor
      @autor = Autor.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def aparams
      params.require(:autor).permit(:name, :surname,:password, :password_confirmation)
    end
end