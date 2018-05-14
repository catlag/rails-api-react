require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if Rails.env.development?
  AdminUser.first_or_create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
  Component.create(name: 'single', order: 1, urls:['https://i.imgur.com/17BFu.jpg'], category: 'illustration' )
  Component.create(name: 'single', order: 2, urls:['https://i.imgur.com/yy7iq.jpg'], category: 'illustration' )


end
