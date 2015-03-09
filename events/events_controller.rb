class EventsController < ApplicationController
  before_action :check_admin_status, except: [:show, :index]
  before_action :set_event, only: [:edit, :update, :destroy]

  def index
    @event = Event.new
    @events = Event.all

    respond_to do |format|
      format.json { render json: @events }
      format.html
    end
  end

  def new
    @event = Event.new
  end

  def create
    event = Event.new(event_params)

    if event.save
      redirect_to events_path
    else
      render :new
    end
  end

  def update
    if @event.update(event_params)
      redirect_to events_path
    else
      render :edit
    end
  end

  def destroy
    @event.destroy

    redirect_to events_path
  end

  private

  def check_admin_status
    unless current_user.is_admin?
      redirect_to root_path
    end
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.
      require(:event).
      permit(
        :date,
        :title,
        :main_photo
      )
  end
end
