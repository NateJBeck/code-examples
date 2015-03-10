class Event < ActiveRecord::Base
  validates :date, presence: true
  validates :title, presence: true
  validates :start_time, presence: true

  has_attached_file :main_photo,
                    styles: {
                              thumbnail: "100x100>",
                              portrait: "500x750>"
                            },
                    storage: :dropbox,
                    dropbox_credentials: Rails.root.join("config/dropbox.yml"),
                    path: ":style/:id_:filename"

  validates_attachment_content_type :main_photo,
    content_type: /\Aimage\/.*\Z/

  validates :main_photo, attachment_presence: true

  validates_with AttachmentPresenceValidator,
    attributes: :main_photo

  validates_with AttachmentSizeValidator,
    attributes: :main_photo,
    less_than: 2.megabytes
end
