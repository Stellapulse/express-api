const { z } = require("zod");

const registerSchema = z.object({
    name: z
        .string()
        .min(3,"Name must contain atleast 3 characters")
        .max(50),

    email : z 
        .email("Invalid email address"),

    password: z
            .string()
            .min(8,"Password should contain at least 8 characters")
            .max(20),

    contact_no: z
                .string()
                .trim()
                .regex(/^[6-9]\d{9}$/, "please Enter a valid 10 digit number"),

   
    
});

const loginSchema = z.object({
    email: z
         .email("Please enter a valid email address"),
    
    password: z
            .string()
            .min(8,"Password should contain atleast 8 characters")
});

module.exports = {
    registerSchema,
    loginSchema

};