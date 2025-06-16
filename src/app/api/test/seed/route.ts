import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if we have any schools
    const existingSchools = await prisma.school.findMany()
    
    if (existingSchools.length === 0) {
      // Create a test school
      const testSchool = await prisma.school.create({
        data: {
          name: "Test Surf School",
          description: "A test surf school for development purposes",
          address: "123 Test Street",
          city: "Lisbon",
          country: "Portugal",
          images: ["https://example.com/test-image.jpg"],
          ownerId: "test-owner", // Note: This will fail if no user exists with this ID
        }
      })
      
      return NextResponse.json({
        success: true,
        message: "Test school created",
        school: testSchool
      })
    }
    
    return NextResponse.json({
      success: true,
      message: "Schools already exist",
      count: existingSchools.length
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
} 